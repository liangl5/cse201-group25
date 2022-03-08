import java.util.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.PreparedStatement;
import java.sql.Statement;


public class DBConnection {

	// Connect to your database.
    // Replace server name, username, and password with your credentials
    public static void main(String[] args) {
        String connectionUrl =
                "jdbc:sqlserver://gitapps.database.windows.net:1433;"
                        + "database=GitApps;"
                        + "user=steve@gitapps;"
                        + "password=yourpassword;"
                        + "encrypt=true;"
                        + "trustServerCertificate=false;"
                        + "loginTimeout=30;";

        String insertSql = "INSERT INTO SalesLT.Product (Name, ProductNumber, Color, StandardCost, ListPrice, SellStartDate) VALUES "
                + "('NewBike', 'BikeNew', 'Blue', 50, 120, '2016-01-01');";
        // ^ need to edit insert statement for inserting the correct data into our tables
        
        
        ResultSet resultSet = null;

        try (Connection connection = DriverManager.getConnection(connectionUrl);
                PreparedStatement prepsInsertProduct = connection.prepareStatement(insertSql, Statement.RETURN_GENERATED_KEYS);) {

            prepsInsertProduct.execute();
            // Retrieve the generated key from the insert.
            resultSet = prepsInsertProduct.getGeneratedKeys();

            // Print the ID of the inserted row.
            while (resultSet.next()) {
                System.out.println("Generated: " + resultSet.getString(1));
            }
            
            
            
        }
        
        catch (Exception e) {
            e.printStackTrace();
        }
        
        
        
        try (Connection connection2 = DriverManager.getConnection(connectionUrl);
                Statement statement = connection2.createStatement();) {

            // Create and execute a SELECT SQL statement.
        	String selectSql = "SELECT * from Apps";
            resultSet = statement.executeQuery(selectSql);

            // Print results from select statement
            while (resultSet.next()) {
                System.out.println(resultSet.getString(2) + " " + resultSet.getString(3));
            }
        }
        
        // Handle any errors that may have occurred.
        catch (Exception e) {
            e.printStackTrace();
        }
    }
	
	
}
