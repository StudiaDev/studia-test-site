import "../styles/style.css"
import Header from '@/components/header'
import PipelineInformationContainer from "@/components/ic/pipeline-ic"
import RawChapterInformationContainer from "@/components/ic/raw-chapter-ic"
import ChapterInformationMediaContainer from "@/components/chapter-info/chapter-information-media"

export default function Home() {
  return (
    <main className="dark">
      <div>
        <Header />
        <div className="hero-space">
          <div className="left-panel">
            <div className="left-panel-content">
              <PipelineInformationContainer checkpoint="frontera-beta/v091824" model="gpt-4o" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
