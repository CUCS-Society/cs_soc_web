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
    id: "current-constitution",
    title: "現行會章",
    children: [
      {
        id: "constitution-2026",
        title: "會章(2026年1月修訂)",
        content: (
          <div className="flex gap-4">
            <a href="/doc/society_doc/constitution_2026_ver2.pdf" target="_blank" >
              會章
            </a>
            <a href="/doc/society_doc/amendment_2026_ver2.pdf" target="_blank" >
              修訂條文詮釋 (草擬)
            </a>
          </div>
        ),
      },
      {
        id: "constitution-2022",
        title: "會章(2022年4月修訂)",
        content: (
          <div className="flex gap-4">
            <a href="/doc/44th_2022/soc_doc/Consutitution_2022_ver2.pdf" target="_blank" >
              會章
            </a>
            <a href="/doc/44th_2022/soc_doc/amendment_2022_ver2.pdf" target="_blank" >
              修訂條文詮釋
            </a>
          </div>
        ),
      },
      {
        id: "constitution-2020",
        title: "會章(2020年12月修訂)",
        content: (
          <div className="flex gap-4">
            <a href="/doc/society_doc/constitution_2020_chin_ver1.pdf" target="_blank" >
              會章
            </a>
            <a href="/doc/society_doc/amendment_2020_ver1.pdf" target="_blank" >
              修訂條文詮釋
            </a>
          </div>
        ),
      },
      {
        id: "constitution-2016",
        title: "會章(2016年3月修訂)",
        content: (
          <div className="flex gap-4">
            <a href="doc/society_doc/constitution_2016_ver1.pdf" target="_blank" >
              會章
            </a>
            <a href="doc/society_doc/amendment_2016_ver1.pdf" target="_blank" >
              修訂條文詮釋
            </a>
          </div>
        ),
      },
      {
        id: "constitution-interpretation",
        title: "會章詮釋",
        content: (
          <a href="doc/36th_2014/soc_doc/constitution_interpretation.docx" target="_blank" >
            會章詮釋
          </a>
        ),
      },
      {
        id: "member-application",
        title: "基本會員登記程序附則",
        content: (
          <a href="doc/society_doc/annex_member_application.pdf" target="_blank" >
            基本會員登記程序附則
          </a>
        ),
      },
    ],
  },
  {
    id: "previous-constitutions",
    title: "先行會章",
    children: [
      {
        id: "decade-2010s",
        title: "2010年代",
        children: [
          {
            id: "const-2014-11",
            title: "2014年11月修訂",
            content: (
              <div className="flex gap-4">
                <a href="/AdminPanel/doc/society_doc/constitution_2014_ver1.pdf" target="_blank" >
                  會章
                </a>
                <a href="/AdminPanel/doc/society_doc/amendment_2014_ver1.pdf" target="_blank" >
                  修訂條文詮釋
                </a>
              </div>
            ),
          },
          {
            id: "const-2013-04",
            title: "2013年4月修訂",
            content: (
              <div className="flex gap-4">
                <a href="doc/society_doc/constitution_2013_ver1.pdf" target="_blank" >
                  會章
                </a>
                <a href="doc/society_doc/amendment_2013_ver1.pdf" target="_blank" >
                  修訂條文詮釋
                </a>
              </div>
            ),
          },
          {
            id: "const-2012-10",
            title: "2012年10月修訂 【新書院第二修訂】",
            content: (
              <div className="flex gap-4">
                <a href="doc/society_doc/constitution_2012_ver2.pdf" target="_blank" >
                  會章
                </a>
                <a href="doc/society_doc/amendment_2012ver2.pdf" target="_blank" >
                  修訂條文詮釋
                </a>
              </div>
            ),
          },
          {
            id: "const-2012-09",
            title: "2012年9月修訂",
            content: (
              <div className="flex gap-4">
                <a href="doc/society_doc/constitution_2012_ver1.pdf" target="_blank" >
                  會章
                </a>
                <a href="doc/society_doc/amendment_2012ver1.pdf" target="_blank" >
                  修訂條文詮釋
                </a>
              </div>
            ),
          },
          {
            id: "const-2010",
            title: "2010年修訂 【新書院第一修訂】",
            content: (
              <div className="flex gap-4">
                <a href="doc/society_doc/constitution_2010_ver2.0.pdf" target="_blank" >
                  會章
                </a>
                <a href="doc/society_doc/amendment_2010.pdf" target="_blank" >
                  修訂條文詮釋
                </a>
              </div>
            ),
          },
        ],
      },
      {
        id: "decade-2000s",
        title: "2000年代",
        children: [
          {
            id: "const-2006",
            title: "2006年修訂",
            content: (
              <a href="doc/society_doc/constitution_2006.pdf" target="_blank" >
                會章
              </a>
            ),
          },
          {
            id: "const-2001",
            title: "2001年修訂",
            content: (
              <a href="doc/society_doc/old_constitution.pdf" target="_blank" >
                會章
              </a>
            ),
          },
        ],
      },
      {
        id: "decade-1990s",
        title: "1990年代",
        children: [
          {
            id: "const-1995",
            title: "1995年修訂 【計科修訂】",
            content: (
              <a href="doc/society_doc/Constitution/consitution95~01.doc" target="_blank" >
                會章
              </a>
            ),
          },
          {
            id: "const-1993",
            title: "1993年修訂",
            content: (
              <a href="doc/society_doc/Constitution/amendment93 notice.doc" target="_blank" >
                修訂條文詮釋
              </a>
            ),
          },
        ],
      },
      {
        id: "decade-1980s",
        title: "1980年代",
        children: [
          {
            id: "const-1988",
            title: "1988年修訂 【逸夫修訂】",
            content: (
              <a href="doc/society_doc/Constitution/consitution8X~93.doc" target="_blank" >
                會章
              </a>
            ),
          },
          {
            id: "const-1984",
            title: "1984年修訂 【崇基修訂】",
            content: (
              <div className="flex gap-4">
                <a href="doc/society_doc/Constitution/consitution85~xx.doc" target="_blank" >
                  會章
                </a>
                <a href="doc/society_doc/Constitution/amendment84_notice.doc" target="_blank" >
                  修訂條文詮釋
                </a>
              </div>
            ),
          },
          {
            id: "const-1983",
            title: "1983年修訂 【新亞修訂】",
            content: (
              <div className="flex gap-4">
                <a href="doc/society_doc/Constitution/consitution84.doc" target="_blank" >
                  會章
                </a>
                <a href="doc/society_doc/Constitution/amendment83_notice.doc" target="_blank" >
                  修訂條文詮釋
                </a>
              </div>
            ),
          },
          {
            id: "const-1985-sscc",
            title: "1985年《師生諮議委員會章則》",
            content: (
              <a href="doc/society_doc/Constitution/consitution_sscc85.doc" target="_blank" >
                章則
              </a>
            ),
          },
        ],
      },
      {
        id: "decade-1970s",
        title: "1970年代",
        children: [
          {
            id: "const-1979-v2",
            title: "1979年第二修訂",
            content: (
              <a href="doc/society_doc/Constitution/consitution79ver2.doc" target="_blank" >
                會章
              </a>
            ),
          },
          {
            id: "const-1979-v1",
            title: "1979年第一修訂 【主修生修訂】",
            content: (
              <a href="doc/society_doc/Constitution/consitution79ver1.doc" target="_blank" >
                會章
              </a>
            ),
          },
          {
            id: "const-1977-v2",
            title: "1977年修訂",
            content: (
              <a href="doc/society_doc/Constitution/consitution77~78ver2.doc" target="_blank" >
                會章
              </a>
            ),
          },
          {
            id: "const-1977-v1",
            title: "1977年",
            content: (
              <a href="doc/society_doc/Constitution/consitution77~78ver1.doc" target="_blank" >
                會章
              </a>
            ),
          },
        ],
      },
      {
        id: "engineering-faculty",
        title: "工程學院院會會章",
        children: [
          {
            id: "engineering-2012",
            title: "院會（2012）會章",
            content: (
              <a href="doc/society_doc/constitution_engine.pdf" target="_blank" >
                會章
              </a>
            ),
          },
        ],
      },
    ],
  },
  {
    id: "48th-cabinet",
    title: "第四十八屆幹事會文件",
    children: [
      {
        id: "general-meetings",
        title: "常務會議",
        children: [
          {
            id: "gm-1st",
            title: "第一次常務會議",
            content: (
              <div className="flex gap-4">
                <a href="doc/48th_2026/soc_doc/1st_GM_agenda.pdf" target="_blank" >
                  會議議程
                </a>
                <a href="doc/48th_2026/soc_doc/1st_GM_minutes.pdf" target="_blank" >
                  會議紀錄
                </a>
              </div>
            ),
          },
          {
            id: "gm-2nd",
            title: "第二次常務會議",
            content: (
              <div className="flex gap-4">
                <a href="doc/48th_2026/soc_doc/2nd_GM_agenda.pdf" target="_blank" >
                  會議議程
                </a>
                <a href="doc/48th_2026/soc_doc/2nd_GM_minutes.pdf" target="_blank" >
                  會議紀錄
                </a>
              </div>
            ),
          },
          {
            id: "gm-3rd",
            title: "第三次常務會議",
            content: (
              <div className="flex gap-4">
                <a href="doc/48th_2026/soc_doc/3rd_GM_agenda.pdf" target="_blank" >
                  會議議程
                </a>
                <a href="doc/48th_2026/soc_doc/3rd_GM_minutes.pdf" target="_blank" >
                  會議紀錄
                </a>
              </div>
            ),
          },
          {
            id: "gm-4th",
            title: "第四次常務會議",
            content: (
              <div className="flex gap-4">
                <a href="doc/48th_2026/soc_doc/4th_GM_agenda.pdf" target="_blank" >
                  會議議程
                </a>
                <a href="doc/48th_2026/soc_doc/4th_GM_minutes.pdf" target="_blank" >
                  會議紀錄
                </a>
              </div>
            ),
          },
          {
            id: "gm-5th",
            title: "第五次常務會議",
            content: (
              <div className="flex gap-4">
                <a href="doc/48th_2026/soc_doc/5th_GM_agenda.pdf" target="_blank" >
                  會議議程
                </a>
                <a href="doc/48th_2026/soc_doc/5th_GM_minutes.pdf" target="_blank" >
                  會議紀錄
                </a>
              </div>
            ),
          },
          {
            id: "gm-6th",
            title: "第六次常務會議",
            content: (
              <div className="flex gap-4">
                <a href="doc/48th_2026/soc_doc/6th_GM_agenda.pdf" target="_blank" >
                  會議議程
                </a>
                <a href="doc/48th_2026/soc_doc/6th_GM_minutes.pdf" target="_blank" >
                  會議紀錄
                </a>
              </div>
            ),
          },
          {
            id: "gm-7th",
            title: "第七次常務會議",
            content: (
              <div className="flex gap-4">
                <a href="doc/48th_2026/soc_doc/7th_GM_agenda.pdf" target="_blank" >
                  會議議程
                </a>
                <a href="doc/48th_2026/soc_doc/7th_GM_minutes.pdf" target="_blank" >
                  會議紀錄
                </a>
              </div>
            ),
          },
          {
            id: "gm-8th",
            title: "第八次常務會議",
            content: (
              <div className="flex gap-4">
                <a href="doc/48th_2026/soc_doc/8th_GM_agenda.pdf" target="_blank" >
                  會議議程
                </a>
                <a href="doc/48th_2026/soc_doc/8th_GM_minutes.pdf" target="_blank" >
                  會議紀錄
                </a>
              </div>
            ),
          },
          {
            id: "gm-9th",
            title: "第九次常務會議",
            content: (
              <div className="flex gap-4">
                <a href="doc/48th_2026/soc_doc/9th_GM_agenda.pdf" target="_blank" >
                  會議議程
                </a>
                <a href="doc/48th_2026/soc_doc/9th_GM_minutes.pdf" target="_blank" >
                  會議紀錄
                </a>
              </div>
            ),
          },
          {
            id: "gm-10th",
            title: "第十次常務會議",
            content: (
              <div className="flex gap-4">
                <a href="doc/48th_2026/soc_doc/10th_GM_agenda.pdf" target="_blank" >
                  會議議程
                </a>
                <a href="doc/48th_2026/soc_doc/10th_GM_minutes_2.pdf" target="_blank" >
                  會議紀錄
                </a>
              </div>
            ),
          },
          {
            id: "gm-11th",
            title: "第十一次常務會議",
            content: (
              <div className="flex gap-4">
                <a href="doc/48th_2026/soc_doc/11th_GM_agenda.pdf" target="_blank" >
                  會議議程
                </a>
                <a href="doc/48th_2026/soc_doc/11th_GM_minutes.pdf" target="_blank" >
                  會議紀錄
                </a>
              </div>
            ),
          },
          {
            id: "gm-12th",
            title: "第十二次常務會議",
            content: (
              <div className="flex gap-4">
                <a href="doc/48th_2026/soc_doc/12th_GM_agenda.pdf" target="_blank" >
                  會議議程
                </a>
                <a href="doc/48th_2026/soc_doc/12th_GM_minutes.pdf" target="_blank" >
                  會議紀錄
                </a>
              </div>
            ),
          },
          {
            id: "gm-13th",
            title: "第十三次常務會議",
            content: (
              <div className="flex gap-4">
                <a href="doc/48th_2026/soc_doc/13th_GM_agenda.pdf" target="_blank" >
                  會議議程
                </a>
                <a href="doc/48th_2026/soc_doc/13th_GM_minutes.pdf" target="_blank" >
                  會議紀錄
                </a>
              </div>
            ),
          },
        ],
      },
      {
        id: "annual-plan",
        title: "全年工作計劃及財政預算",
        content: (
          <a href="doc/48th_2026/soc_doc/48thcabinet_yp.pdf" target="_blank" >
            全年工作計劃及財政預算
          </a>
        ),
      },
      {
        id: "annual-report",
        title: "全年工作報告及財政報告",
        content: (
          <a href="doc/48th_2026/soc_doc/47th_AnnualReport.pdf" target="_blank" >
            全年工作報告及財政報告
          </a>
        ),
      },
    ],
  },
];

const DocumentAccordionLists = ({ lang }: { lang: string }) => {
    const t = Dictionary[lang];

    return (
      <div className="mx-auto w-[90%] lg:w-1/2 max-w-none py-10">
                  <BreadcrumbPlugin
                  items={[
                      { label: t.home, href: `./../` },
                      { label: t.documents, href: `./`},
                      { label: t.constitution, href: `.` },
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