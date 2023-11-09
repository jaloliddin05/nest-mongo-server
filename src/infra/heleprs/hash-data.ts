import * as bcryptjs from 'bcryptjs';

const hashData = async(data: string) => {
    const salt = bcryptjs.genSaltSync(10);
    return await bcryptjs.hashSync(data, salt);
}

export default hashData