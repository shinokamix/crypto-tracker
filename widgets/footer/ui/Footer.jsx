import FooterContent from "./FooterContent";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer
            className="relative lg:h-[800px] h-[400px] bg-[var(--tableColor)]"
            style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
            <div className="relative lg:h-[calc(100dvh+800px)] h-[calc(100dvh+400px)] -top-[100dvh]">
                <div className="lg:h-[800px] h-[400px] sticky lg:top-[calc(100dvh-800px)] top-[calc(100dvh-400px)]">
                    <FooterContent year={year} />
                </div>
            </div>
        </footer>
    );
}
