"use client";

import React, { useState, useEffect, useRef } from "react";
import NavItem from "./nav-item";

const Navigation = ({ data }) => {
    const [activeSection, setActiveSection] = useState(null);
    const observer = useRef(null);

    useEffect(() => {
        observer.current = new IntersectionObserver((entries) => {
            const visibleSection = entries.find((entry) => entry.isIntersecting)?.target;
            if (visibleSection) {
                setActiveSection(visibleSection.id);
            }
        }, { threshold: 0.5 });

        const sections = document.querySelectorAll('[data-section]');

        sections.forEach((section) => {
            observer.current.observe(section);
        });

        return () => {
            sections.forEach((section) => {
                observer.current.unobserve(section);
            });
        };
    }, []);

    return (
        <div id="navigation" className="flex flex-col py-10 font-medium tracking-widest">
            <NavItem active={activeSection === "about"} href="#about" num="01" name={data.about} />
            <NavItem active={activeSection === "experiences"} href="#experiences" num="02" name={data.experiences} />
            <NavItem active={activeSection === "education"} href="#education" num="03" name={data.education} />
            <NavItem active={activeSection === "volunteering"} href="#volunteering" num="04" name={data.volunteering} />
            <NavItem active={activeSection === "projects"} href="#projects" num="05" name={data.projects} />
        </div>
    );
};

export default Navigation;
