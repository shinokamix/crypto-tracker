import ScrambleText from "@/shared/ui/ScrambleText";

export default function Heading() {
    return (
        <div className="sm:my-30 my-20">
            <ScrambleText
                text={"Crypto Prices"}
                align="center"
                className="xl:text-9xl lg:text-8xl md:text-7xl text-4xl"
            />
        </div>
    );
}
