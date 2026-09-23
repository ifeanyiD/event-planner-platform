import bcrypt from "bcryptjs";

const hashPassword = async function () {
    // Don't hash the password again if it wasn't changed
    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
};

export default hashPassword;