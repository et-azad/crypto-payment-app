import PageHead from "@/components/layouts/PageHead";
import Layout from "@/components/layouts/Layout";
import SettingForm from "@/components/setup/SettingForm";

export default function Home() {
  return (
    <>
      <PageHead title="Settings" />
      <Layout
        footerOneliner="Completed the Setting? start accepting Payments!"
      >
        <div className="w-full md:w-6/12 shadow-2xl rounded-xl">
          <SettingForm />
        </div>
      </Layout>
    </>
  );
}
