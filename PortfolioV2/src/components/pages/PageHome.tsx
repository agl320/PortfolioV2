import { useContext, useEffect, useState } from "react";
import Bio from "../subcomponents/Section/SectionBio";
import { experienceData, projectData } from "../data/data";
import BoxSocials from "../subcomponents/Box/BoxSocials";
import Section from "../subcomponents/Section/Section";
import Involvement from "../subcomponents/Section/SectionInvolvement";
import { ThemeContext } from "../contexts";

function PageHome() {
    const [projectVisible, setProjectVisible] = useState(false);
    const [experienceVisible, setExperienceVisible] = useState(false);
    const [involveVisible, setInvolveVisible] = useState(false);

    useEffect(() => {
        const targetElement = document.getElementById("experience");

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth",
            });
            setExperienceVisible(true);
        }

        const onScroll = () => {
            const projectsEl = document.getElementById("projects");
            const experiencesEl = document.getElementById("experience");
            const involveEl = document.getElementById("involvement");

            const projectsTop = 1;
            const experiencesTop = 0;
            const involveTop = 2;
            if (experiencesEl && projectsEl && involveEl) {
                if (
                    experiencesEl.getBoundingClientRect().top <=
                        experiencesTop &&
                    projectsEl.getBoundingClientRect().top > projectsTop
                ) {
                    // window.location.hash = "#experience";
                    setExperienceVisible(true);
                } else {
                    setExperienceVisible(false);
                }

                if (
                    projectsEl.getBoundingClientRect().top <= projectsTop &&
                    involveEl.getBoundingClientRect().top > involveTop
                ) {
                    // window.location.hash = "#projects";
                    setProjectVisible(true);
                } else {
                    // window.location.hash = "";
                    setProjectVisible(false);
                }

                if (involveEl.getBoundingClientRect().top <= involveTop) {
                    // window.location.hash = "#involvement";
                    setInvolveVisible(true);
                } else {
                    // window.location.hash = "";
                    setInvolveVisible(false);
                }
            }
        };
        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    const sectionContent = [
        { sectionName: "experience", boxesData: experienceData.slice(0, 3) },
        { sectionName: "projects", boxesData: projectData.slice(0, 4) },
    ];

    const { currentTheme } = useContext(ThemeContext);

    return (
        <>
            <div className={`background ${currentTheme}`}></div>

            <div className={`main ${currentTheme}`}>
                {/* <ThemeComponent /> */}
                <div className="main-left">
                    <Bio
                        projectVisible={projectVisible}
                        experienceVisible={experienceVisible}
                        involveVisible={involveVisible}
                    />
                    <div>
                        <div style={{ width: "fit-content" }}>
                            <BoxSocials />
                        </div>
                    </div>
                </div>

                <div className="main-right">
                    {sectionContent.map((sectionItem) => {
                        return (
                            <Section
                                sectionName={sectionItem.sectionName}
                                boxesData={sectionItem.boxesData}
                            />
                        );
                    })}
                    <Involvement />
                </div>
            </div>
        </>
    );
}

export default PageHome;
