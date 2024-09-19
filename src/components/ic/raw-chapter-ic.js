import InformationContainer from "./information-container"

/**
 * RawChapterInformationContainer Component
 * 
 * Displays raw information about a textbook chapter.
 * It includes the book title, chapter number, number of pages, word count, and estimated reading time.
 * 
 * @component
 * @param {Object} props - The properties object.
 * @param {string} props.book - The title of the book.
 * @param {number} props.chapterNum - The chapter number.
 * @param {number} props.pages - The number of pages in the chapter.
 * @param {number} props.words - The word count of the chapter.
 * @param {number} props.time - The estimated reading time in hours.
 * @returns {JSX.Element} A container with raw textbook information.
 * 
 * @example
 * <RawChapterInformationContainer 
 *   book="Example Book Title" 
 *   chapterNum={1} 
 *   pages={20} 
 *   words={5000} 
 *   time={2} 
 * />
 */

export default function RawChapterInformationContainer({book, chapterNum, pages, words, time}) {
    return (
      <InformationContainer title={"Raw Textbook Information"}>
        <RawChapterInformationContainerContent book={book} chapterNum={chapterNum} pages={pages} words={words} time={time} />
      </InformationContainer>
    )
  }

function RawChapterInformationContainerContent({book, chapterNum, pages, words, time}) {
    return (
        <div className="chapter-information-content">
          <p className="chapter-information-content-title">{book}</p>
          <p className="chapter-information-content-chapter-number">Chapter {chapterNum}</p>
          <p className="chapter-information-metadata">{pages} Pages - {words} Words - {time} Hours est.</p>
        </div>
    )
}