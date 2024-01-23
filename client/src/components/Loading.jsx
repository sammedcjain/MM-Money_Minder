import { MoonLoader } from "react-spinners";

function Loading({ first }) {
  return (
    <div>
      <div
        style={{
          background: "black",
          marginTop: "300px",
          marginBottom: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <style>{`body { background: black; font-family: 'Arial', sans-serif; }`}</style>
        <MoonLoader color={"#90ee90"} loading={true} />
      </div>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        {first && (
          <h3
            style={{ color: "#90ee90", fontFamily: "Arial", fontSize: "24px" }}
          >
            Waiting for the server to respond...
            <br />
            <br /> Please wait...
            <br /> It may take up to 30 seconds
          </h3>
        )}
      </div>
    </div>
  );
}

export default Loading;
