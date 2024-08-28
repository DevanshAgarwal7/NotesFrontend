export const environment = {
    api:[
        {
            type: "userApi",
            uri: "http://localhost:8080/api/",
        },
        {
            type: "notesApi",
            uri: "http://localhost:8080/api/"
        }
    ],
    about_developer: "https://www.linkedin.com/in/devansh--agarwal/",
    images:{
            bgImage: "https://img.freepik.com/free-photo/young-businesswoman-brainstorming-sticky-note-ideas-night-generated-by-ai_188544-32782.jpg?t=st=1703426872~exp=1703430472~hmac=1e892ada214f4ae59942e376fcb22b0c4c88c5c1840d468b5c2626d49b33117e&w=1060",
            loginLogo: "https://img.freepik.com/free-vector/secure-data-concept-illustration_114360-2510.jpg?w=740&t=st=1703432088~exp=1703432688~hmac=17c8403c546cc1a762bb50b872fd23839b5c587d5afda5c4ebc9162b98446f3d",
            signUpLogo: "https://img.freepik.com/free-vector/going-offline-concept-illustration_114360-7253.jpg?t=st=1703442242~exp=1703442842~hmac=cb26a9dd1dc837758595bcd78c37340d8fdbe1a433454ffd609d8927fd22a7c7",
            forgotLogo: "https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-4652.jpg?w=740&t=st=1703432129~exp=1703432729~hmac=624a162c72ee3e3df957289ac408ad8e9035cb4f0859148ca4d6dc22fb4c3e50",
            emptyNotes: "https://img.freepik.com/free-photo/several-sticky-post-notes-different-colors_1101-2145.jpg?t=st=1708710268~exp=1708713868~hmac=1414bd4e797948ac0d6e8b67418c95b58e1bd9e6011effac39f7ffff4b3200a0&w=996",
    },
    errors: {
        unauthorised: "Please Provide Correct Email OR You Are Not Registered With Us.",
        alreadyRegistered: "You are already registered, Please Login."
    },
    success: {
        loginSuccess: "Login Successfully",
        signupSuccess: "SignUp Successfully,",
        OtpSuccess: "OTP Send Successfully.",
        logout: "Logout Successfully.",
        forgotPassword: "Password Changed.",
        deleteSuccess: "Deleted Successfully."
    }
}