import "../styles/style.css"

function Header() {
  return (
    <div className="header-wrapper">
      <img className="elements" src="/images/test-site-header-img.svg" alt="Logo" />
    </div>
  )
}

function InformationContainer({ title, children }) {
  return (
    <div className="information-container">
      <InformationContainerHeader title={title} />
      <InformationContainerContent children={children} />
    </div>
  )
}

function InformationContainerContent({ children }) {
  return (
    <div className="information-container-content">
      {children}
    </div>
  )
}

function InformationContainerHeader({ title }) {
  return (
    <div className="information-container-header">
      <p className="information-container-header-title">{title}</p>
    </div>
  )
}

function PipelineInformationContainer({checkpoint, model}) {
  return (
    <InformationContainer title={"Model Pipeline"}>
      <div className="pipeline-information-container">
        <p className="pipeline-information-container-title">{checkpoint}</p>
        <p className="pipeline-information-container-subtitle">Running on '{model}'</p>
      </div>
    </InformationContainer>
  )
}

function RawChapterInformationContainer({book, chapterNum, pages, words, time}) {
  return (
    <InformationContainer title={"Original Text"}>
      <div className="chapter-information-container">
        <p className="chapter-information-container-title">{book}</p>
        <p className="chapter-information-container-chapter-number">{chapterNum}</p>
        <p className="chapter-information-metadata">{pages} Pages - {words} Words - {time} Hours est.</p>
      </div>
    </InformationContainer>
  )
}

function CurrentCourseInformation({course, chapterNum, pages, image}) {
  return (
    <InformationContainer title={"Course Information"}>
      <div className="chapter-information-container" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <div> 
          <img src={image} className="course-image"></img>
        </div>
        <div style={{ marginLeft: '20px' }}>
        <p className="chapter-information-container-supplementary info">{chapterNum + '-' + pages + ' pages'}</p>
        <p className="chapter-information-container-course-name" style={{ fontWeight: '400', fontSize: 20}}>{course}</p>
        </div>
      </div>
    </InformationContainer>
  )
}
export default function Home() {
  return (
    <main className="dark">
      <Header />
      <div className="elements">
        <PipelineInformationContainer checkpoint={"frontera-beta/v090524"} model={"gpt-4o-2024-08-06"} />
      </div>
      <div className="elements">
        <RawChapterInformationContainer book={"Global Conflicts Throughout History - 3rd Edition"} chapterNum={"Chapter 3"} pages={"13"} words={"12,342"} time={"2"} />
      </div>
      <div className="elements">
        <CurrentCourseInformation chapterNum={"2"} course={"Introduction to Machine Learning"} pages={"18"}  time={"2"} image={"/images/character.png"}/>
      </div>
    </main>
  );
}
