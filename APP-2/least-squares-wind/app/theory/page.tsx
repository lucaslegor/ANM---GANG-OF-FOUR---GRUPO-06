import SectionTitle from "@/components/SectionTitle"
import Equation from "@/components/Equation"

export default function TheoryPage() {
  return (
    <section>
      <SectionTitle label="Theoretical Background" />
      <div className="card p">
        <h3>Least Squares Regression</h3>
        <p style={{ marginBottom: "1rem" }}>
          In least squares regression, we find parameters that minimize the sum of squared residuals between observed
          and predicted values.
        </p>
        <Equation tex="SSE = \sum_{i=1}^{n} (y_i - \hat{y}_i)^2" />
      </div>

      <div className="card p" style={{ marginTop: "1.5rem" }}>
        <h3>Coefficient of Determination (R²)</h3>
        <p style={{ marginBottom: "1rem" }}>
          R² measures the proportion of variance in the dependent variable explained by the model:
        </p>
        <Equation tex="R^2 = 1 - \frac{\sum (y_i - \hat{y}_i)^2}{\sum (y_i - \bar{y})^2}" />
        <p style={{ marginTop: "1rem" }} className="muted">
          Adjusted R² accounts for the number of predictors:
        </p>
        <Equation tex="R^2_{adj} = 1 - \frac{(1-R^2)(n-1)}{n-k-1}" />
      </div>

      <div className="card p" style={{ marginTop: "1.5rem" }}>
        <h3>Power Model (Log-Log Transform)</h3>
        <p style={{ marginBottom: "1rem" }}>For the power model y = ax^b, we use logarithmic transformation:</p>
        <Equation tex="\ln y = \ln a + b \ln x" />
        <p style={{ marginTop: "1rem" }} className="muted">
          This linearizes the relationship, allowing us to use linear regression on the transformed data.
        </p>
      </div>
    </section>
  )
}
