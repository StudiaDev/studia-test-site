import React, { useState, useEffect } from "react";
import Image from 'next/image';
import PipelineInformationContainer from "@/components/ic/pipeline-ic";
import RawChapterInformationContainer from "@/components/ic/raw-chapter-ic";
import ChapterInformationMediaContainer from "@/components/chapter-info/chapter-information-media";

export function Portal({ course, chapter, chapterText }) {    
    const [topicIndex, setTopicIndex] = useState(0);
    const [contentIndex, setContentIndex] = useState(-1);
    const [isFadingOut, setIsFadingOut] = useState(false);

    // check if user is at first or last slide
    const isLeftDisabled = topicIndex === 0 && contentIndex === -1;
    const isRightDisabled = topicIndex === chapterText.topic_list.length - 1 && contentIndex === chapterText.topic_list[topicIndex].topic_content.length - 1;

    // LEFT BUTTON
    const handleLeft = () => {
        if (isLeftDisabled) return;
        
        setIsFadingOut(true);
        setTimeout(() => {
            if (contentIndex > -1) {
                setContentIndex(contentIndex - 1);
            } else if (topicIndex > 0) {
                const prevTopicIndex = topicIndex - 1;
                const prevTopicContentLength =
                    chapterText.topic_list[prevTopicIndex].topic_content.length;
                setTopicIndex(prevTopicIndex);
                setContentIndex(prevTopicContentLength - 1);
            }
            setIsFadingOut(false);
        }, 500);
    };

    // RIGHT BUTTON
    const handleRight = () => {
        if (isRightDisabled) return;
        
        setIsFadingOut(true);
        setTimeout(() => {
            const currentTopic = chapterText.topic_list[topicIndex];
            if (contentIndex < currentTopic.topic_content.length - 1) {
                setContentIndex(contentIndex + 1);
            } else if (topicIndex < chapterText.topic_list.length - 1) {
                setTopicIndex(topicIndex + 1);
                setContentIndex(-1);
            }
            setIsFadingOut(false);
        }, 500);
    };

    // calculate estimated reading time
    function calculateReadingTime(words) {
        var time = (words / 230) / 60;
        return Math.round(time * 100) / 100;
    }

    // handle arrow keys
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft" && !isLeftDisabled) {
                handleLeft();
            } else if (e.key === "ArrowRight" && !isRightDisabled) {
                handleRight();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [topicIndex, contentIndex]);

    return (
        <div className="flex-panels">
            <div className="left-flex-panel portal-wrapper">
                <div className="left-panel-element">
                    <PipelineInformationContainer
                        checkpoint="frontera-beta/v092324"
                        model="gpt-4o"
                    />
                    <RawChapterInformationContainer 
                        book={course.bookTitle}
                        chapterNum={chapter.chapterNum}
                        pages={chapter.chapterPages}
                        words={chapter.chapterWords}
                        time={calculateReadingTime(chapter.chapterWords)}
                        rawText={chapter.rawText}
                    />
                </div>
                <div className="left-panel-element">
                    <ChapterInformationMediaContainer 
                        course={course.title}
                        chapterNum={chapter.chapterNum}
                        pages={chapter.chapterPages}
                        image={course.bookImage}
                    />
                </div>
            </div>
            <div className="right-flex-panel">
                <div className={`text-container ${isFadingOut ? 'fadeOut' : 'fadeInUp'}`}>
                    <h2>
                        {contentIndex === -1
                            ? chapterText.topic_list[topicIndex].topic_title
                            : chapterText.topic_list[topicIndex].topic_content[contentIndex]}
                    </h2>
                    <h3 className="topic-quote">
                        {contentIndex === -1 ? `"${chapterText.topic_list[topicIndex].topic_quote}"` : ""}
                    </h3>
                    <Image src="/images/logo.svg" alt="Logo" width={30} height={50} className="logo" />
                </div>
                <div className="page-change-buttons">
                    <button
                        className={`page-button left-button ${isLeftDisabled ? 'disabled' : ''}`}
                        onClick={handleLeft}
                        disabled={isLeftDisabled}
                    >
                        <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="/images/left-button.svg">
                            <path d="M0 6.5L9.75 0.870834V12.1292L0 6.5Z" fill="white"/>
                        </svg>
                    </button>
                    <button
                        className={`page-button right-button ${isRightDisabled ? 'disabled' : ''}`}
                        onClick={handleRight}
                        disabled={isRightDisabled}
                    >
                        <svg className="triangle-right" width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="/images/right-button.svg">
                            <path d="M0 6.5L9.75 0.870834V12.1292L0 6.5Z" fill="white"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
