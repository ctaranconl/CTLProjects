import tkinter as tk
from tkinter import ttk
from tkinter import messagebox
import pandas as pd
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
# https://open.spotify.com/playlist/6BwqOpfTEpBoswiDl9NsSQ?si=57f0631e315e4d43
def getPlaylistFromSpotify(prompt):
    # set up Spotify API credentials
    client_id = '1e5dd61308534114a7bfc0b649fa569a'
    client_secret = '1829d37152904ffeacba298185a00da4'
    client_credentials_manager = SpotifyClientCredentials(client_id, client_secret)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    # specify the Spotify playlist URL
    playlist_url = prompt

    # get playlist details
    playlist = sp.playlist(playlist_url)

    SPlaylist = []

    for track in playlist['tracks']['items']:
            row = []
            track_name = track['track']['name']
            artist_name = track['track']['artists'][0]['name']
            album_name = track['track']['album']['name']
            row.append(track_name)
            row.append(artist_name)
            row.append(album_name)
            SPlaylist.append(row)
    
    return SPlaylist


    return playlist['tracks']['items']
    # create a text file to save the results
    filename = playlist['name']
    #with open(filename, 'w') as f:
    #    # write header row to file
    #    f.write('Title,Artist,Album\n')
    #    # loop through playlist tracks and write info to file
    #    for track in playlist['tracks']['items']:
    #        track_name = track['track']['name']
    #        artist_name = track['track']['artists'][0]['name']
    #        album_name = track['track']['album']['name']
    #        f.write(f'{track_name},{artist_name},{album_name}\n')

class MainWindow:
    def __init__(self, root):
        self.root = root
        self.root.title("SPOTIFY Playlist Data Downloader")
        self.create_widgets()
        self.style_widgets()

    def create_widgets(self):
        # Create a label and an input field
        prompt_label = tk.Label(self.root, text="Enter playlist URL:")
        prompt_label.pack(padx=10, pady=30)



        self.prompt_entry = tk.Entry(self.root, width=50)
        self.prompt_entry.pack(padx=10)

        # Create a button to submit the prompt
        submit_button = tk.Button(self.root, text="Submit", command=self.submit_prompt)
        submit_button.pack(padx=10, pady=10)

        # Create a table to show the pandas dataframe
        self.table = ttk.Treeview(self.root, columns=("Title", "Artist", "Album"), show="headings")
        #self.table.column("Title", width=200)
        #self.table.column("Artist", width=200)
        #self.table.column("Album", width=200)
        self.table.heading("Title", text="Title")
        self.table.heading("Artist", text="Artist")
        self.table.heading("Album", text="Album")
        self.table.pack(fill='both', expand=True, padx=80, pady=40)

    def style_widgets(self):
        # Define custom styles for the widgets
        self.root.configure(background="#555555")
        root.geometry('1920x1080')
        root.resizable(True, True)

        style = ttk.Style()
        style.configure('CustomStyle.TFrame', background='#2e2e2e', borderwidth=2, relief='groove')
        
        frame = ttk.Frame(root, style='CustomStyle.TFrame')
        frame.pack()

        self.prompt_entry.configure(background="#6b6b6b", foreground="white", highlightthickness=1, highlightbackground="#ccc", highlightcolor="#ccc", relief=tk.FLAT, font=("Arial", 12))
        self.prompt_entry.focus()
        
        self.table.configure(height=5, selectmode="none")
        self.table.tag_configure("oddrow", background="#120f0e", foreground="white")
        self.table.tag_configure("evenrow", background="#1c1614", foreground="white")
        self.table.bind("<Button-1>", lambda event: self.table.focus_set())

    def submit_prompt(self):
        # Get the prompt from the input field
        prompt = self.prompt_entry.get()

        # Create a pandas dataframe from a dictionary
        data = getPlaylistFromSpotify(prompt)
        df = pd.DataFrame(data, columns = ["Title", "Artist", "Album"])

        # Clear the table and add the new data
        self.table.delete(*self.table.get_children())
        for index, row in df.iterrows():
            tag = "oddrow" if index % 2 == 0 else "evenrow"
            self.table.insert("", "end", values=(row["Title"], row["Artist"], row["Album"]), tags=(tag,))


if __name__ == "__main__":
    # Create the tkinter window and run the application
    root = tk.Tk()
    app = MainWindow(root)
    root.mainloop()
