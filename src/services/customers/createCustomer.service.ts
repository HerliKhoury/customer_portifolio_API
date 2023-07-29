import { Repository } from "typeorm";
import { Customer } from "../../entities/customers.entity";
import { MyDataSource } from "../../data-source";
import { TCostumer, TCostumerReq } from "../../interfaces/customers.interface";
import { customerSchema } from "../../schemas/customers.schemas";


export const createCustomer = async(userData: TCostumerReq): Promise<TCostumer> => {
    const customerRepo: Repository<Customer> = MyDataSource.getRepository(Customer);

    const newCustomer = customerRepo.create(userData);

    const customerEntity = await customerRepo.save(newCustomer);

    const validCustomer: TCostumer = customerSchema.parse(customerEntity);

    return validCustomer;
};