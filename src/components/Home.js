import Courses from "./Courses";

function Home(props) {
const {showAlert} = props;
  return (
    <div>
      <Courses showAlert={showAlert} />
    </div>
  );
}

export default Home;
