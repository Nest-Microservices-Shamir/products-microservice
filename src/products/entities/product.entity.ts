import { UUIDV4 } from "sequelize";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: 'product',
    paranoid: true,
    freezeTableName: true,
    timestamps: true
})
export class Product extends Model {

    @Column({ type: DataType.UUID, defaultValue: UUIDV4(), allowNull: false, primaryKey: true })
    id: string;

    @Column
    public name: string;

    @Column({ type: DataType.FLOAT })
    public price: number;
}
