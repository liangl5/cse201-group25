import java.awt.Color;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JPasswordField;
import javax.swing.JTextField;
import javax.swing.border.EmptyBorder;

public class Login extends JFrame{

	private static final long serialVersionUID = 1L;
    private JTextField userField;
    private JPasswordField passField;
    private JButton loginButton;
    private JPanel contentPane;

    public static void main(String[] args) {
        Login frame = new Login();
        frame.setTitle("Login");
        frame.setVisible(true);
    }

    public Login() {
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setBounds(450, 190, 1014, 597);
        setResizable(false);
        contentPane = new JPanel();
        contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
        setContentPane(contentPane);
        contentPane.setLayout(null);

        JLabel title = new JLabel("GitApps");
        title.setForeground(Color.BLACK);
        title.setFont(new Font("Tahoma", Font.PLAIN, 75));
        title.setBounds(350, 50, 273, 93);
        contentPane.add(title);

        userField = new JTextField();
        userField.setFont(new Font("Tahoma", Font.PLAIN, 32));
        userField.setBounds(481, 170, 281, 68);
        contentPane.add(userField);
        userField.setColumns(10);

        passField = new JPasswordField();
        passField.setFont(new Font("Tahoma", Font.PLAIN, 32));
        passField.setBounds(481, 286, 281, 68);
        contentPane.add(passField);

        JLabel userLabel = new JLabel("Username");
        userLabel.setBackground(Color.BLACK);
        userLabel.setForeground(Color.BLACK);
        userLabel.setFont(new Font("Tahoma", Font.PLAIN, 31));
        userLabel.setBounds(250, 166, 193, 52);
        contentPane.add(userLabel);

        JLabel passLabel = new JLabel("Password");
        passLabel.setForeground(Color.BLACK);
        passLabel.setBackground(Color.CYAN);
        passLabel.setFont(new Font("Tahoma", Font.PLAIN, 31));
        passLabel.setBounds(250, 286, 193, 52);
        contentPane.add(passLabel);

        loginButton = new JButton("Login");
        loginButton.setFont(new Font("Tahoma", Font.PLAIN, 26));
        loginButton.setBounds(410, 392, 162, 73);
        loginButton.addActionListener(new ActionListener() {

            public void actionPerformed(ActionEvent e) {
                String userName = userField.getText();
                String password = passField.getText();
               
                if (userName.equals("Tom22") && password.equals("password22")) {
                	dispose();
                    UserHome ah = new UserHome(userName);
                    ah.setTitle("Welcome");
                    ah.setVisible(true);
                    JOptionPane.showMessageDialog(loginButton, "You have successfully logged in");
                } else {
                    JOptionPane.showMessageDialog(loginButton, "Wrong Username and Password");
               }
            }
        });
        
        contentPane.add(loginButton);

    }
}
