
CREATE TABLE recipes (
    recipe_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);

CREATE TABLE ingredients (
    ingredient_id SERIAL PRIMARY KEY,
    ingredient_name VARCHAR(255) NOT NULL
);

CREATE TABLE steps (
    step_id SERIAL PRIMARY KEY,
    recipe_id INT REFERENCES recipes(recipe_id),
    step_number INT NOT NULL,
    description TEXT NOT NULL,
    UNIQUE(recipe_id, step_number)
);

CREATE TABLE recipe_categories (
    recipe_id INT REFERENCES recipes(recipe_id),
    category_id INT REFERENCES categories(category_id),
    PRIMARY KEY (recipe_id, category_id)
);

CREATE TABLE recipe_ingredients (
    recipe_id INT REFERENCES recipes(recipe_id),
    ingredient_id INT REFERENCES ingredients(ingredient_id),
    quantity VARCHAR(50), 
    PRIMARY KEY (recipe_id, ingredient_id)
);
