import java.awt.Color;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.UIManager;
import javax.swing.border.EmptyBorder;

import com.sun.jdi.event.EventQueue;

public class UserHome extends JFrame{
	private static final long serialVersionUID = 1L;
    private JPanel contentPane;

    public static void main(String[] args) {
	    UserHome frame = new UserHome();
	    frame.setVisible(true);
    }

    public UserHome() {

    }

    public UserHome(String curUser) {
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setBounds(450, 190, 1014, 597);
        setResizable(false);
        contentPane = new JPanel();
        contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
        setContentPane(contentPane);
        contentPane.setLayout(null);
        JButton logoutButton = new JButton("Logout");
        logoutButton.setFont(new Font("Tahoma", Font.PLAIN, 40));
        logoutButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                int act = JOptionPane.showConfirmDialog(logoutButton, "Are you sure?");
                if (act == JOptionPane.YES_OPTION) {
                    dispose();
                    Login obj = new Login();
                    obj.setTitle("Login");
                    obj.setVisible(true);
                }
            }
        });
        logoutButton.setBounds(245, 100, 400, 150);
        contentPane.add(logoutButton);
    }
}
