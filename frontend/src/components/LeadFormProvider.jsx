import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";
import LeadFormDialog from "@/components/LeadFormDialog";

const LeadFormContext = createContext(null);

export function LeadFormProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [source, setSource] = useState("audit");

    const open = useCallback((src = "audit") => {
        setSource(src);
        setIsOpen(true);
    }, []);

    const close = useCallback(() => setIsOpen(false), []);

    const value = useMemo(
        () => ({ open, close, isOpen, source }),
        [open, close, isOpen, source],
    );

    return (
        <LeadFormContext.Provider value={value}>
            {children}
            <LeadFormDialog
                open={isOpen}
                onOpenChange={setIsOpen}
                source={source}
            />
        </LeadFormContext.Provider>
    );
}

export function useLeadForm() {
    const ctx = useContext(LeadFormContext);
    if (!ctx)
        throw new Error("useLeadForm must be used inside LeadFormProvider");
    return ctx;
}
