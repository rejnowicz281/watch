import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";

export default function Loading({ spinnerSize = "50px" }) {
    return (
        <div className="flex justify-center items-center flex-1">
            <VscLoading style={{ fontSize: spinnerSize }} className="animate-spin" />
        </div>
    );
}
