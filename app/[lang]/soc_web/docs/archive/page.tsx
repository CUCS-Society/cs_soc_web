import {
  DocumentItem,
  RecursiveAccordionContent,
} from "@/components/RecursiveAccordion";
import { BreadcrumbPlugin } from "@/components/BreadcrumbPlugin";
import { Dictionary } from "@/components/Translation";

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}


const items: DocumentItem[] = [
  {
    id: "regular-meetings",
    title: "常務會議",
    children: [
      {
        id: "1st-gm",
        title: "第一次常務會議",
        content: (
          <div className="flex gap-4">
            <a href="/doc/48th_2026/soc_doc/1st_GM_agenda.pdf">會議議程</a>
            <a href="/doc/48th_2026/soc_doc/1st_GM_minutes.pdf">會議紀錄</a>
          </div>
        ),
      },
      {
        id: "2nd-gm",
        title: "第二次常務會議",
        content: (
          <div className="flex gap-4">
            <a href="/doc/48th_2026/soc_doc/2nd_GM_agenda.pdf">會議議程</a>
            <a href="/doc/48th_2026/soc_doc/2nd_GM_minutes.pdf">會議紀錄</a>
          </div>
        ),
      },
      {
        id: "3rd-gm",
        title: "第三次常務會議",
        content: (
          <div className="flex gap-4">
            <a href="/doc/48th_2026/soc_doc/3rd_GM_agenda.pdf">會議議程</a>
            <a href="/doc/48th_2026/soc_doc/3rd_GM_minutes.pdf">會議紀錄</a>
          </div>
        ),
      },
      {
        id: "4th-gm",
        title: "第四次常務會議",
        content: (
          <div className="flex gap-4">
            <a href="/doc/48th_2026/soc_doc/4th_GM_agenda.pdf">會議議程</a>
            <a href="/doc/48th_2026/soc_doc/4th_GM_minutes.pdf">會議紀錄</a>
          </div>
        ),
      },
      {
        id: "5th-gm",
        title: "第五次常務會議",
        content: (
          <div className="flex gap-4">
            <a href="/doc/48th_2026/soc_doc/5th_GM_agenda.pdf">會議議程</a>
            <a href="/doc/48th_2026/soc_doc/5th_GM_minutes.pdf">會議紀錄</a>
          </div>
        ),
      },
      {
        id: "6th-gm",
        title: "第六次常務會議",
        content: (
          <div className="flex gap-4">
            <a href="/doc/48th_2026/soc_doc/6th_GM_agenda.pdf">會議議程</a>
            <a href="/doc/48th_2026/soc_doc/6th_GM_minutes.pdf">會議紀錄</a>
          </div>
        ),
      },
      {
        id: "7th-gm",
        title: "第七次常務會議",
        content: (
          <div className="flex gap-4">
            <a href="/doc/48th_2026/soc_doc/7th_GM_agenda.pdf">會議議程</a>
            <a href="/doc/48th_2026/soc_doc/7th_GM_minutes.pdf">會議紀錄</a>
          </div>
        ),
      },
      {
        id: "8th-gm",
        title: "第八次常務會議",
        content: (
          <div className="flex gap-4">
            <a href="/doc/48th_2026/soc_doc/8th_GM_agenda.pdf">會議議程</a>
            <a href="/doc/48th_2026/soc_doc/8th_GM_minutes.pdf">會議紀錄</a>
          </div>
        ),
      },
      {
        id: "9th-gm",
        title: "第九次常務會議",
        content: (
          <div className="flex gap-4">
            <a href="/doc/48th_2026/soc_doc/9th_GM_agenda.pdf">會議議程</a>
            <a href="/doc/48th_2026/soc_doc/9th_GM_minutes.pdf">會議紀錄</a>
          </div>
        ),
      },
      {
        id: "10th-gm",
        title: "第十次常務會議",
        content: (
          <div className="flex gap-4">
            <a href="/doc/48th_2026/soc_doc/10th_GM_agenda.pdf">會議議程</a>
            <a href="/doc/48th_2026/soc_doc/10th_GM_minutes_2.pdf">會議紀錄</a>
          </div>
        ),
      },
      {
        id: "11th-gm",
        title: "第十一次常務會議",
        content: (
          <div className="flex gap-4">
            <a href="/doc/48th_2026/soc_doc/11th_GM_agenda.pdf">會議議程</a>
            <a href="/doc/48th_2026/soc_doc/11th_GM_minutes.pdf">會議紀錄</a>
          </div>
        ),
      },
      {
        id: "12th-gm",
        title: "第十二次常務會議",
        content: (
          <div className="flex gap-4">
            <a href="/doc/48th_2026/soc_doc/12th_GM_agenda.pdf">會議議程</a>
            <a href="/doc/48th_2026/soc_doc/12th_GM_minutes.pdf">會議紀錄</a>
          </div>
        ),
      },
      {
        id: "13th-gm",
        title: "第十三次常務會議",
        content: (
          <div className="flex gap-4">
            <a href="/doc/48th_2026/soc_doc/13th_GM_agenda.pdf">會議議程</a>
            <a href="/doc/48th_2026/soc_doc/13th_GM_minutes.pdf">會議紀錄</a>
          </div>
        ),
      },
    ],
  },
  {
    id: "annual-plan-budget",
    title: "全年工作計劃及財政預算",
    content: (
      <table className="w-full border-collapse border border-gray-300">
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2">
              <a href="/doc/48th_2026/soc_doc/48thcabinet_yp.pdf">全年工作計劃及財政預算</a>
            </td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    id: "annual-report",
    title: "全年工作報告及財政報告",
    content: (
      <table className="w-full border-collapse border border-gray-300">
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2">
              <a href="/doc/48th_2026/soc_doc/47th_AnnualReport.pdf">全年工作報告及財政報告</a>
            </td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    id: "fund-records",
    title: "會費基金出納紀錄",
    content: (
      <table className="w-full border-collapse border border-gray-300">
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2">三月</td>
            <td className="border border-gray-300 p-2">六月</td>
            <td className="border border-gray-300 p-2">九月</td>
            <td className="border border-gray-300 p-2">十二月</td>
          </tr>
        </tbody>
      </table>
    ),
  },
];

const DocumentAccordionLists = ({ lang }: { lang: string }) => {
    const t = Dictionary[lang];

    return(
    <div className="mx-auto w-[90%] lg:w-1/2 max-w-none py-10">
                <BreadcrumbPlugin
                items={[
                    { label: t.home, href: `./..` },
                    { label: t.documents, href: `.`},
                    { label: t.archive, href: `.`},
                ]}
                />
    
                <RecursiveAccordionContent items={items}/>
    </div>
    )
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  return <DocumentAccordionLists lang={lang} />;
}