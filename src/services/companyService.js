import Company from "../models/Company.js";
import User from "../models/User.js";

export const createCompanyService = async (companyData, userId) => {
    const existCompany = await Company.findOne({ name: companyData.name });
    if (existCompany) {
        throw new Error("A company with this name already exists.");
    }

    const user = await User.findById(userId);
    if (user.companyId) {
        throw new Error("You have already registered a company.");
    }

    const newCompany = await Company.create({
        ...companyData,
        createdBy: userId
    });

    user.companyId = newCompany._id;
    await user.save();

    return newCompany;
}
