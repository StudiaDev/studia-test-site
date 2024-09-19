import "../styles/style.css"
import Header from '@/components/header'
import PipelineInformationContainer from "@/components/ic/pipeline-ic"
import RawChapterInformationContainer from "@/components/ic/raw-chapter-ic"
import ChapterInformationMediaContainer from "@/components/chapter-info/chapter-information-media"

export default function Home() {
  return (
    <main className="dark">
      <div className="flex-full">
        <Header />
        <div className="flex-panels">
          <div className="left-flex-panel">
            <div className="left-panel-element">
              <PipelineInformationContainer
                checkpoint="frontera-beta/v092324"
                model="gpt-4o"
              />
              <RawChapterInformationContainer 
                book="Introduction to Advanced Algorithms: Third Edition"
                chapterNum={2}
                pages={13}
                words={8000}
                time={0.75}
              />
            </div>
            <div className="left-panel-element">
              <ChapterInformationMediaContainer 
                course={"CS 4349: Advanced Algorithm Design and Analysis"}
                chapterNum={2}
                pages={13}
                image={"https://m.media-amazon.com/images/I/61O5SsbL8HL._AC_UF1000,1000_QL80_.jpg"}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
