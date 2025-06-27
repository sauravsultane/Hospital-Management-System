export const addDoctor = async (req, res) => {
    try {
      const { name, email, password, speciality, exprience, degree, about, fees, address } = req.body;
      const imageFile = req.file;
  
      console.log({ name, email, password, speciality, exprience, degree, about, fees, address }, imageFile);
  
      res.status(200).json({ message: "Doctor received", data: req.body, image: imageFile });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };
  