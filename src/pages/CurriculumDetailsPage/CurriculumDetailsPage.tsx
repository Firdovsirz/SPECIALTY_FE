import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import CurriculumDetails from "../../components/curriculumDetails/CurriculumDetails";

export default function CurriculumDetailsPage() {
    return (
        <>
            <PageMeta
                title="AzTU İxtisaslar"
                description="AzTU İxtisaslar"
            />
            <PageBreadcrumb pageTitle="İxtisasın kurrikulum məlumatları" />
            <div className="space-y-6">
                <ComponentCard title="İxtisasın kurrikulum məlumatları">
                    <CurriculumDetails />
                </ComponentCard>
            </div>
        </>
    );
}
