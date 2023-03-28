import React, { useState } from 'react'; import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PlanComponent from './components/PlanComponent';
import IngridientForm from './components/IngridientForm';
import RecipeForm from './components/RecipeForm';
import IngridientsList from './components/IngridientsList';
import RecipesList from './components/RecipesList';
import SideBar from './components/SideBar';

function App() {
  const [ingridientFormMode, setIngridientFormMode] = useState("Create");
  const [recipeFormMode, setRecipeFormMode] = useState("Create");
  const [ingridientToUpdate, setIngridientDataToUpdate] = useState(null);
  const [recipeToUpdate, setRecipeDataToUpdate] = useState(null);
  const [openIngridientForm, setOpenIngridientForm] = useState(false);
  const [openRecipesForm, setOpenRecipesForm] = useState(false);
  const [activeSlice, setActiveSlice] = useState("");

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
        <Col xs={12} md={2} id="">
          <SideBar setActiveSlice={setActiveSlice} />
        </Col>
        <Col xs={12} md={10} id="content">
          <Row>
            {activeSlice == "Ingridients" ?
              <>
                <Col xs={12} md={6}>
                  <IngridientsList setIngridientDataToUpdate={setIngridientDataToUpdate} setOpenIngridientForm={setOpenIngridientForm} setIngridientFormMode={setIngridientFormMode} selectIngridient={selectIngridient} />
                </Col>
                <Col xs={12} md={6}>

                  {openIngridientForm &&
                    <IngridientForm mode={ingridientFormMode} setOpenIngridientForm={setOpenIngridientForm} setIngridientFormMode={setIngridientFormMode} dataToUpdate={ingridientToUpdate} setIngridientDataToUpdate={setIngridientDataToUpdate} />
                  }                </Col>

              </>
              : activeSlice == "Recipes" ?
                <>                
                <Col xs={12} md={6}>
                  <RecipesList setRecipeDataToUpdate={setRecipeDataToUpdate} setRecipeFormMode={setRecipeFormMode} selectRecipe={selectRecipe} setOpenRecipesForm={setOpenRecipesForm} />
                </Col>
                <Col xs={12} md={6}>
                  {openRecipesForm &&
                    <RecipeForm mode={recipeFormMode} setOpenRecipesForm={setOpenRecipesForm} setRecipeFormMode={setRecipeFormMode} dataToUpdate={recipeToUpdate} setRecipeDataToUpdate={setRecipeDataToUpdate} />
                  }
                </Col>
                </>
                : <h5>Welcome in app</h5>
            }
          </Row>
          {/* <Row>
            <Col>
            <PlanComponent/>
            </Col>
            </Row> */
          }
        </Col>
      </Row>
    </Container>
  );
}

export default App;
