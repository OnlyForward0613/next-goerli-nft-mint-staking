import ScaleLoader from "react-spinners/ScaleLoader"

export default function Loading({ loading, children, ...props }) {
    return (
        <div className={loading ? "loading active" : "loading"}>
            <ScaleLoader loading={loading} size={150} color="#fff" />
        </div>
    )
}