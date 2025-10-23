import ScrambleText from "@/shared/ui/ScrambleText";

export default function ErrorBox({ error }) {
    return (
        <div className="flex flex-col">
            <div className="text-center my-30 h-32">
                <ScrambleText
                    text={`Error ${error?.status}`}
                    className={"justify-center"}
                />
            </div>
            <div className="mx-auto">
                <p className="text-2xl text-left">
                    {`Error info: ${error?.info?.error}`}
                </p>
                <p className="text-2xl text-left">Check console for more.</p>
            </div>
        </div>
    );
}
