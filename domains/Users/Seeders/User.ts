import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import {UserFactory} from "Domains/Users/Factories/UserFactory";
import Logger from "@ioc:Adonis/Core/Logger";

export default class extends BaseSeeder {
  public async run () {
    await UserFactory.createMany(20)
    Logger.info("20 users was created")
  }
}
