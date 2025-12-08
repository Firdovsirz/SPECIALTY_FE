import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title="AzTU İxtisas informasiya sistemi"
        description="AzTU-da tədris olunan bütün ixtisaslar və onların iş imkanları"
      />
      <div className="flex flex-col justify-start items-center min-h-screen">
        <img
          src="/aztu-logo-dark.webp"
          alt="AzTU Light"
          className="block dark:hidden w-[200px]"
        />
        <img
          src="/aztu-logo-light.png"
          alt="AzTU Dark"
          className="hidden dark:block w-[200px]"
        />
        <div className="mt-[50px]">
          <h1 className="text-black dark:text-white text-3xl font-medium text-center text-[rgb(30, 39, 81)]">
            AzTU İxtisas İnformasiya Sistemi
          </h1>
          <p className="text-center max-w-[600px] text-gray-800 dark:text-gray-200 mt-10 text-[20px] text-[rgb(30, 39, 81)]">
            İxtisas informasiya sistemi sizə AzTU-da tədris olunan ixtisaslar barədə məlumat, ixtisasların gələcək imkanları, məzunların iş imkanları və ixtisasların sillabuslarını əhatə edir.
          </p>
        </div>
      </div>
    </>
  );
}