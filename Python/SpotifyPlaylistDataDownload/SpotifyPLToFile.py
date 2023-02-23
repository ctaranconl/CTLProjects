import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import tkinter as tk
from tkinter import simpledialog

def playlistInputDialog():

    # create a tkinter window
    root = tk.Tk()
    root.withdraw()

    options = ['txt', 'csv', 'xlsx']

    dialog = simpledialog.Dialog(title="Enter playlist URL",
                             text="Please enter the playlist URL:",
                             buttons=["OK"],
                             cancel="OK",
                             parent=root)
    dialog = simpledialog.Dialog(root, title="User Input")

    # Add a text field to the dialog box
    input_text = tk.Entry(dialog)
    input_text.pack()

    # Add a dropdown menu to the dialog box
    dropdown_var = tk.StringVar(dialog)
    dropdown_var.set(options[0])  # Set the default option
    dropdown = tk.OptionMenu(dialog, dropdown_var, *options)
    dropdown.pack()

    # Wait for the user to close the dialog box
    dialog.mainloop()

    # Get the user input
    user_input_text = input_text.get()
    user_dropdown_choice = dropdown_var.get()



    # create a simpledialog to get user input and the dropdown menu
    #user_input = simpledialog.askstring(title="Enter playlist URI", prompt="Please enter the playlist URL:")

    #dropdown_choice = simpledialog.askstring("Export", "Please select an option:", 
    #                                     parent=root, 
    #                                     initialvalue=options[0],
    #                                     optionmenu=options)

    # print the user input
    return user_input_text, user_dropdown_choice


# set up Spotify API credentials
client_id = '1e5dd61308534114a7bfc0b649fa569a'
client_secret = '1829d37152904ffeacba298185a00da4'
client_credentials_manager = SpotifyClientCredentials(client_id, client_secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

# specify the Spotify playlist URL
playlist_url, export_format = playlistInputDialog()

# get playlist details
playlist = sp.playlist(playlist_url)

# create a text file to save the results
filename = playlist['name']
with open(filename, 'w') as f:
    # write header row to file
    f.write('Title,Artist,Album\n')
    # loop through playlist tracks and write info to file
    for track in playlist['tracks']['items']:
        track_name = track['track']['name']
        artist_name = track['track']['artists'][0]['name']
        album_name = track['track']['album']['name']
        f.write(f'{track_name},{artist_name},{album_name}\n')








