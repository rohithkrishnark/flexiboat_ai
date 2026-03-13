import React, { useEffect, useRef } from "react";
import { Box, Typography, Card } from "@mui/joy";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AiFeatureScroller = () => {

    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {

        const sections = gsap.utils.toArray(".ai-panel");

        const ctx = gsap.context(() => {

            gsap.to(containerRef.current, {
                xPercent: -100 * (sections.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    pin: true,
                    scrub: 1,
                    end: () => "+=" + containerRef.current.offsetWidth,
                }
            });

            sections.forEach((panel) => {

                gsap.from(panel.querySelector(".card"), {
                    y: 120,
                    opacity: 0,
                    scale: 0.8,
                    duration: 1,
                    scrollTrigger: {
                        trigger: panel,
                        containerAnimation: ScrollTrigger.getById(""),
                        start: "left center",
                    }
                });

            });

        }, sectionRef);

        return () => ctx.revert();

    }, []);

    return (
        <Box
            ref={sectionRef}
            sx={{
                height: "100vh",
                overflow: "hidden",
                bgcolor: "#05050a"
            }}
        >

            <Box
                ref={containerRef}
                sx={{
                    display: "flex",
                    height: "100%",
                    width: "400vw"
                }}
            >

                {/* PANEL 1 */}
                <Box
                    className="ai-panel"
                    sx={{
                        width: "100vw",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Card className="card" sx={{ p: 5 }}>
                        <Typography level="h2">AI Academic Assistant</Typography>
                        <Typography>
                            Ask questions and get instant academic explanations.
                        </Typography>
                    </Card>
                </Box>

                {/* PANEL 2 */}
                <Box
                    className="ai-panel"
                    sx={{
                        width: "100vw",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Card className="card" sx={{ p: 5 }}>
                        <Typography level="h2">Document AI Analysis</Typography>
                        <Typography>
                            Upload PDFs and get intelligent summaries instantly.
                        </Typography>
                    </Card>
                </Box>

                {/* PANEL 3 */}
                <Box
                    className="ai-panel"
                    sx={{
                        width: "100vw",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Card className="card" sx={{ p: 5 }}>
                        <Typography level="h2">Smart Learning Insights</Typography>
                        <Typography>
                            Track learning progress using AI analytics.
                        </Typography>
                    </Card>
                </Box>

                {/* PANEL 4 */}
                <Box
                    className="ai-panel"
                    sx={{
                        width: "100vw",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Card className="card" sx={{ p: 5 }}>
                        <Typography level="h2">FlexiBot AI Companion</Typography>
                        <Typography>
                            Your personal AI assistant for academic success.
                        </Typography>
                    </Card>
                </Box>

            </Box>
        </Box>
    );
};

export default AiFeatureScroller;