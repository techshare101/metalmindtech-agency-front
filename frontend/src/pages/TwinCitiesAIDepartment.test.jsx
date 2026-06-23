import { render, screen, fireEvent } from "@testing-library/react";
import TwinCitiesAIDepartment from "./TwinCitiesAIDepartment";

// Mock axios
jest.mock("axios", () => ({
    post: jest.fn(() => Promise.resolve({ data: {} })),
}));

// Mock sonner
jest.mock("sonner", () => ({
    toast: { error: jest.fn(), success: jest.fn() },
}));

// Mock IntersectionObserver
beforeAll(() => {
    global.IntersectionObserver = class {
        constructor() {}
        observe() {}
        unobserve() {}
        disconnect() {}
    };
});

describe("TwinCitiesAIDepartment", () => {
    it("renders the page with correct data-testid", () => {
        render(<TwinCitiesAIDepartment />);
        expect(screen.getByTestId("twin-cities-ai-department-page")).toBeInTheDocument();
    });

    it("renders the Orbitron header with correct text", () => {
        render(<TwinCitiesAIDepartment />);
        expect(screen.getByTestId("tc-hero-header")).toHaveTextContent("TWIN CITIES AI DEPARTMENT");
    });

    it("renders the headline", () => {
        render(<TwinCitiesAIDepartment />);
        expect(screen.getByTestId("tc-hero-headline")).toBeInTheDocument();
        expect(screen.getByText(/The First AI Workforce/i)).toBeInTheDocument();
    });

    it("renders the sub-headline", () => {
        render(<TwinCitiesAIDepartment />);
        expect(screen.getByTestId("tc-hero-subheadline")).toBeInTheDocument();
        expect(screen.getByText(/Stop losing customers to AI-blindness/i)).toBeInTheDocument();
        expect(screen.getByText(/Install your Sovereign Department in 90 minutes/i)).toBeInTheDocument();
    });

    it("renders the demo section with video hook", () => {
        render(<TwinCitiesAIDepartment />);
        expect(screen.getByTestId("tc-demo-section")).toBeInTheDocument();
        expect(screen.getByTestId("tc-demo-hook")).toHaveTextContent(/Voice-command your digital transformation/i);
    });

    it("renders the video placeholder", () => {
        render(<TwinCitiesAIDepartment />);
        expect(screen.getByTestId("tc-demo-video-placeholder")).toBeInTheDocument();
        expect(screen.getByText("7-Minute Turnaround Demo")).toBeInTheDocument();
    });

    it("renders the Sovereign Audit form", () => {
        render(<TwinCitiesAIDepartment />);
        expect(screen.getByTestId("tc-sovereign-audit-form")).toBeInTheDocument();
        expect(screen.getByTestId("tc-form-name")).toBeInTheDocument();
        expect(screen.getByTestId("tc-form-email")).toBeInTheDocument();
        expect(screen.getByTestId("tc-form-phone")).toBeInTheDocument();
        expect(screen.getByTestId("tc-form-business-name")).toBeInTheDocument();
        expect(screen.getByTestId("tc-form-business-type")).toBeInTheDocument();
        expect(screen.getByTestId("tc-form-location")).toBeInTheDocument();
        expect(screen.getByTestId("tc-form-challenge")).toBeInTheDocument();
        expect(screen.getByTestId("tc-form-submit")).toBeInTheDocument();
    });

    it("shows validation error on empty submit", async () => {
        const { toast } = require("sonner");
        render(<TwinCitiesAIDepartment />);
        const submitBtn = screen.getByTestId("tc-form-submit");
        fireEvent.click(submitBtn);
        expect(toast.error).toHaveBeenCalledWith("Please fill in your name, email, and business name.");
    });

    it("renders the navigation with CTA", () => {
        render(<TwinCitiesAIDepartment />);
        expect(screen.getByTestId("tc-navigation")).toBeInTheDocument();
        expect(screen.getByTestId("tc-nav-cta")).toBeInTheDocument();
    });

    it("renders benefits section", () => {
        render(<TwinCitiesAIDepartment />);
        expect(screen.getByTestId("tc-benefits-section")).toBeInTheDocument();
    });

    it("renders footer", () => {
        render(<TwinCitiesAIDepartment />);
        expect(screen.getByTestId("tc-footer")).toBeInTheDocument();
    });

    it("uses correct obsidian background color", () => {
        render(<TwinCitiesAIDepartment />);
        const page = screen.getByTestId("twin-cities-ai-department-page");
        expect(page).toHaveClass("bg-[#05050a]");
    });
});
