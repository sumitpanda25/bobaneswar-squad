from fastapi import FastAPI
import pandas as pd
import re

app = FastAPI()

@app.post("/update-csv")
def update_csv(payload: dict):
    try:
        file_path = payload["file_path"]
        text = payload["agent_output"]

        df = pd.read_csv(file_path)

        if "YES" not in text:
            return {"status": "No change"}

        col_match = re.search(r"Column Name:\s*-\s*(.*)", text)
        formula_match = re.search(r"Formula:\s*-\s*(.*)", text)

        if not col_match or not formula_match:
            return {"status": "Invalid AI output"}

        column_name = col_match.group(1).strip()
        formula = formula_match.group(1).strip()

        df[column_name] = df.eval(formula)

        output_path = "updated_products.csv"
        df.to_csv(output_path, index=False)

        return {
            "status": "success",
            "file": output_path
        }

    except Exception as e:
        return {"error": str(e)}

@app.get("/get-data")
def get_data():
    try:
        # Load the updated CSV file
        output_path = "updated_products.csv"
        df = pd.read_csv(output_path)

        # Convert the DataFrame to a dictionary
        data = df.to_dict(orient="records")

        return {"status": "success", "data": data}
    except Exception as e:
        return {"error": str(e)}