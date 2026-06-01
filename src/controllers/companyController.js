import * as companyService from "../services/companyService.js";

export const createCompany = async (req, res) => {
    try {
        if (req.user.role !== 'employer') {
            return res.status(403).json({ message: "Only employer can create company" });
        }
        const company = await companyService.createCompanyService(req.body, req.user._id);
return res.status(201).json({
    success: true,
    message: "Company created successfully",
    company
    
});    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}