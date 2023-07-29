import { Repository } from "typeorm";
import { MyDataSource } from "../../data-source";
import { MyError } from "../../errors/myError";
import { TCostumer, TCostumerPatch } from "../../interfaces/customers.interface";
import { Customer } from "../../entities/customers.entity";
import { customerSchema } from "../../schemas/customers.schemas";


export const updateCustomerService = async (
    customerId: number, 
    customerData: TCostumerPatch
): Promise<TCostumer> => {
    const customerRepo: Repository<Customer> = MyDataSource.getRepository(Customer);
    
    const oldCustomerData: Customer | null = await customerRepo.findOneBy({
        id: customerId
    });

    if(!oldCustomerData){
        throw new MyError("Customer not found", 404);
    }

    const newCustomerData: Customer = customerRepo.create({
        ...oldCustomerData,
        ...customerData
    });

    await customerRepo.save(newCustomerData);

    const returnCustomer: TCostumer = customerSchema.parse(newCustomerData);

    return returnCustomer;
}