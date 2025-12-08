import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import SpecialtyDetails from "../../components/specialtyDetails/SpecialtyDetails";

export default function SpecialtyDetailsPage() {
    return (
        <>
            <PageMeta
                title="AzTU İxtisaslar"
                description="AzTU İxtisaslar"
            />
            <PageBreadcrumb pageTitle="İxtisas" />
            <div className="space-y-6">
                <ComponentCard title="İxtisas">
                    <SpecialtyDetails />
                </ComponentCard>
            </div>
        </>
    );
}
