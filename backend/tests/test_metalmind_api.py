"""Backend API tests for MetalMindTech landing page."""
import os
import time
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://ceo-blueprint.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health / Root ----------
class TestRoot:
    def test_root_welcome(self, client):
        r = client.get(f"{API}/", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert "message" in data
        assert "MetalMindTech" in data["message"]


# ---------- POST /api/leads ----------
class TestLeadsCreate:
    def test_create_lead_minimum_fields(self, client):
        ts = int(time.time())
        payload = {
            "name": "TEST_Alex Voss",
            "email": f"test_min_{ts}@northwind.io",
            "company": "TEST_Northwind Capital",
        }
        r = client.post(f"{API}/leads", json=payload, timeout=20)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["company"] == payload["company"]
        # default source
        assert data.get("source") == "audit"
        # _id MUST not leak
        assert "_id" not in data
        assert "created_at" in data

    def test_create_lead_all_fields(self, client):
        ts = int(time.time())
        payload = {
            "name": "TEST_Maya Doe",
            "email": f"test_full_{ts}@acme.io",
            "company": "TEST_ACME",
            "role": "Founder & CEO",
            "annual_revenue": "$15M – $50M",
            "notes": "Seeking the Undeniable Outcome.",
            "source": "contact",
        }
        r = client.post(f"{API}/leads", json=payload, timeout=20)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["role"] == payload["role"]
        assert data["annual_revenue"] == payload["annual_revenue"]
        assert data["notes"] == payload["notes"]
        assert data["source"] == "contact"
        assert "_id" not in data

    def test_create_lead_invalid_email(self, client):
        payload = {
            "name": "TEST_Bad Email",
            "email": "not-an-email",
            "company": "TEST_BadCo",
        }
        r = client.post(f"{API}/leads", json=payload, timeout=15)
        assert r.status_code == 422, r.text

    def test_create_lead_missing_required(self, client):
        payload = {"name": "TEST_NoEmail"}
        r = client.post(f"{API}/leads", json=payload, timeout=15)
        assert r.status_code == 422

    def test_create_lead_empty_name_rejected(self, client):
        payload = {
            "name": "",
            "email": "test_empty@x.io",
            "company": "TEST_Co",
        }
        r = client.post(f"{API}/leads", json=payload, timeout=15)
        assert r.status_code == 422


# ---------- GET /api/leads ----------
class TestLeadsList:
    def test_create_then_list_persists_and_recent_first(self, client):
        ts = int(time.time())
        unique_email = f"test_list_{ts}@northwind.io"
        payload = {
            "name": "TEST_ListCheck",
            "email": unique_email,
            "company": "TEST_PersistCo",
            "source": "audit",
        }
        cr = client.post(f"{API}/leads", json=payload, timeout=20)
        assert cr.status_code == 200
        created = cr.json()

        lr = client.get(f"{API}/leads", timeout=20)
        assert lr.status_code == 200, lr.text
        leads = lr.json()
        assert isinstance(leads, list)
        assert len(leads) >= 1

        # ensure _id excluded everywhere
        for lead in leads:
            assert "_id" not in lead
            assert "id" in lead

        # find our created lead
        match = [l for l in leads if l.get("email") == unique_email]
        assert len(match) == 1
        assert match[0]["id"] == created["id"]
        assert match[0]["company"] == "TEST_PersistCo"

        # most-recent-first ordering: our lead should be in the early entries
        emails_top = [l.get("email") for l in leads[:5]]
        assert unique_email in emails_top

    def test_list_leads_limit_param(self, client):
        r = client.get(f"{API}/leads?limit=1", timeout=15)
        assert r.status_code == 200
        leads = r.json()
        assert isinstance(leads, list)
        assert len(leads) <= 1
