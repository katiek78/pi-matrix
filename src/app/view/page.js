import Link from "next/link";
import PiViewTable from "@/components/PiViewTable";
export default function View() {
  return (
    <div>
      <main>
        <br />
        <h1 className="center">Pi Matrix</h1>
        {/* Add your Pi matrix code here */}
        <br />
        <h2 className="center">
          <Link href="/">Go to Training</Link>
        </h2>
        <div className="container">
          <PiViewTable />
        </div>
      </main>
    </div>
  );
}
