import SignUpInputField from "./components/SignUpInputField";
import SignUpHeader from "./components/SignUpHeader";
import SignUpFooter from "./components/SignUpFooter";
// import SignUpButton from "./components/SignUpButton";
import SideImage from "./components/images/Teen-driver-holding-driving-license.jpg";
import BackgroundImage from "./components/images/SideImage.jpg";

function SignUpPage() {
  const handleSubmit = (formData) => {
    // Handle form submission logic (e.g., API call)
    console.log("Form submitted with data:", formData);
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={
        {
          // backgroundImage: `url(${BackgroundImage})`,
        }
      }
    >
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-5xl w-full">
        {/* Side Image Section */}
        <div className="w-1/2">
          <img
            src={SideImage}
            alt="Side"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Form Section */}
        <div className="w-1/2 flex flex-col justify-center p-10">
          <SignUpHeader />
          <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
          <SignUpInputField onSubmit={handleSubmit} />
          <SignUpFooter />
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
