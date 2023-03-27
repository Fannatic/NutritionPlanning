import React, { useState } from 'react'; import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PlanComponent from './features/PlanComponent';
import IngridientForm from './features/IngridientForm';
import RecipeForm from './features/RecipeForm';
import IngridientsList from './features/IngridientsList';
import RecipesList from './features/RecipesList';


function App() {

  const [displayIntgridientForm, setDisplayIntgridientForm] = useState(false);
  const [displayRecipeForm, setDisplayRecipeForm] = useState(false);
  const [ingridientFormMode, setIngridientFormMode] = useState("Create");
  const [recipeFormMode, setRecipeFormMode] = useState("Create");
  const [ingridientToUpdate, setIngridientDataToUpdate] = useState(null);
  const [recipeToUpdate, setRecipeDataToUpdate] = useState(null);


  const selectIngridient = (e) => {
    setIngridientFormMode("Update");
    setIngridientDataToUpdate(e);
  };

  const selectRecipe = (e) => {
    setRecipeFormMode("Update");
    setRecipeDataToUpdate(e);
  };

  return (
    <Container>
      <Row>
        <Col>
        <IngridientsList selectIngridient={selectIngridient} />
        </Col>
        <Col>
        <IngridientForm mode={ingridientFormMode} setIngridientFormMode={setIngridientFormMode} dataToUpdate={ingridientToUpdate} setIngridientDataToUpdate={setIngridientDataToUpdate}/>
        </Col>
      </Row>
      <br/>
      <Row>
        <Col>
        <RecipesList selectRecipe={selectRecipe}/>
        </Col>
        <Col>
        <RecipeForm mode={recipeFormMode} setRecipeFormMode={setRecipeFormMode} dataToUpdate={recipeToUpdate} setRecipeDataToUpdate={setRecipeDataToUpdate}/>
        </Col>
      </Row>
      <br />
      {/* <Row>
        <Col>
          <PlanComponent/>
        </Col>
      </Row> */}
    </Container>
  );
}

export default App;
