import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";
import s from './App.scss';
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="App">
      <body>
        <Home/>
      </body>

        <Router>
            <Routes>
                <Route exact path={'/'} component={Home}/>
                {/*<Route exact path={'/'} component={EditMenuPage}/>*/}
                {/*<Route exact path={'/'} component={ClassPage}/>*/}
                {/*<Route exact path={'/'} component={FeaturePage}/>*/}
                {/*<Route exact path={'/'} component={FeatureValuesPage}/>*/}
                {/*<Route exact path={'/'} component={ClassFeaturesPage}/>*/}
                {/*<Route exact path={'/'} component={ClassFeaturesValuesPage}/>*/}
                {/*<Route exact path={'/'} component={InputBlockPage}/>*/}
                {/*<Route exact path={'/'} component={ResultPage}/>*/}
            </Routes>
        </Router>
    </div>
  );
}

export default App;
