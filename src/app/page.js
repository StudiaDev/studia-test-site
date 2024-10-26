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
            <h1>Welcome back, Tester</h1>
            <div className="left-panel-element">
              <PipelineInformationContainer
                checkpoint="frontera-beta/v092324"
                model="gpt-4o"
              />
              <RawChapterInformationContainer 
                book="Global Conflicts Throughout History - 3rd Edition"
                chapterNum={7}
                pages={27}
                words={13324}
                time={2}
              />
            </div>
            <div className="left-panel-element">
              <ChapterInformationMediaContainer 
                course="Introduction to Machine Learning"
                chapterNum={5}
                pages={27}
                image="https://m.media-amazon.com/images/I/61O5SsbL8HL._AC_UF1000,1000_QL80_.jpg"
              />
            </div>
          </div>
          <div className="right-flex-panel">
            <div className="page-change-buttons">
              <button className="page-button left-button"> <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 6.5L9.75 0.870834V12.1292L0 6.5Z" fill="white"/></svg></button>
              <button className="page-button right-button"> <svg className = "triangle-right" width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 6.5L9.75 0.870834V12.1292L0 6.5Z" fill="white"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
