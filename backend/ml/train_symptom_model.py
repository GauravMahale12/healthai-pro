import pandas as pd
import joblib

from sklearn.preprocessing import MultiLabelBinarizer, LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report


print("Loading dataset...")

# Load main disease dataset
df = pd.read_csv("dataset.csv")

print("Dataset loaded successfully")
print("Total rows:", len(df))
print("Total columns:", len(df.columns))


# -----------------------------
# STEP 1: Collect symptom columns
# -----------------------------

symptom_columns = [
    col for col in df.columns
    if col.lower().startswith("symptom")
]

print("\nSymptom columns found:")
print(symptom_columns)


# -----------------------------
# STEP 2: Convert row symptoms to list
# Example:
# ["itching", "skin_rash", "vomiting"]
# -----------------------------

symptom_lists = []

for _, row in df.iterrows():
    symptoms = []

    for col in symptom_columns:
        value = row[col]

        if pd.notna(value):
            symptoms.append(str(value).strip().lower())

    symptom_lists.append(symptoms)


# -----------------------------
# STEP 3: Convert symptoms → binary features
# using MultiLabelBinarizer
# -----------------------------

print("\nEncoding symptoms...")

mlb = MultiLabelBinarizer()
X = mlb.fit_transform(symptom_lists)

print("Total unique symptoms:", len(mlb.classes_))


# -----------------------------
# STEP 4: Encode disease labels
# -----------------------------

print("\nEncoding disease labels...")

label_encoder = LabelEncoder()
y = label_encoder.fit_transform(df["Disease"])

print("Total diseases:", len(label_encoder.classes_))


# -----------------------------
# STEP 5: Train-test split
# -----------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


# -----------------------------
# STEP 6: Train Random Forest
# -----------------------------

print("\nTraining Random Forest model...")

model = RandomForestClassifier(
    n_estimators=300,
    max_depth=None,
    random_state=42
)

model.fit(X_train, y_train)


# -----------------------------
# STEP 7: Evaluation
# -----------------------------

print("\nEvaluating model...")

y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)

print(f"\nModel Accuracy: {accuracy * 100:.2f}%")

print("\nClassification Report:")
print(
    classification_report(
        y_test,
        y_pred,
        target_names=label_encoder.classes_
    )
)


# -----------------------------
# STEP 8: Save model files
# -----------------------------

print("\nSaving trained model files...")

joblib.dump(model, "disease_model.pkl")
joblib.dump(mlb, "symptom_encoder.pkl")
joblib.dump(label_encoder, "label_encoder.pkl")

print("\nSUCCESS!")
print("Saved files:")
print("- disease_model.pkl")
print("- symptom_encoder.pkl")
print("- label_encoder.pkl")
print("\nHealthAI Pro real ML model ready.")