export default function ChapterInformationMediaContainer({course, chapterNum, pages, image}) {
    return (
        <div className='media-container'>
        <div className="media-content">
            <img src={image} className="media-image"></img>
            <div className="media-text-block">
            <p className="media-subtext">Chapter {chapterNum} - {pages} pages</p>
            <p className="media-title-text">{course}</p>
            </div>
        </div>
        </div>
    )
}