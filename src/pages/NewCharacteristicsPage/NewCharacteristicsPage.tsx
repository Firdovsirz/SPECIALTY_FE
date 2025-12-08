import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import NewSpecialtyCharacteristics from "../../components/newSpecialtyCharacteristics/NewSpecialtyCharacteristics";

export default function NewCloPage() {
    return (
        <>
            <PageMeta
                title="AzTU İxtisaslar"
                description="AzTU İxtisaslar"
            />
            <PageBreadcrumb pageTitle="İxtisas xarakteristikası (Proqramın təsviri və Proqramın tələbləri)" />
            <div className="space-y-6">
                <ComponentCard title="İxtisas xarakteristikası (Proqramın təsviri və Proqramın tələbləri)">
                    <NewSpecialtyCharacteristics />
                </ComponentCard>
            </div>
        </>
    );
}
