def read_files_update_DB(self):
#   Chercher le JDD via un stream et vérifier son existence
file = f"C:\\Users\\Cham\\PycharmProjects\\Library\\src\\streams\\data_import_library.txt"
file_exists = os.path.exists(file)
print(f"Does the file exist ? {file_exists}")
# Ouverture du fichier en mode lecture (reading) dans un bloc try/except car opération sensible
new_list = list()
try:
    with open(file, mode='r', encoding="utf-8") as infile:
        for line in infile:
            if not line.strip() or line.startswith("//"):
                continue  # ignorer les sauts de lignes et celles débutant par "//"
            new_list.append(line)  # ajouter les autres lignes dans la liste vide afin d'itérer après
except FileNotFoundError as file_error:
    print(f"Error_numero: {file_error.errno} - {file_error}")
    traceback.print_exc()

# Afficher la nouvelle liste avec l'index partant de 1 au lieu de 0 dans la méthode native "enumerate()
# print(list(enumerate(new_list, 1))) # Raccourci qui affiche une liste de tuples
# for index, iterated_line in enumerate(new_list, 1):
#     print(index, type(iterated_line), iterated_line)

# Reconnaissance des termes pour déterminer dans quelle table insérer la ligne itérée (Books, Authors, etc.)
for line in new_list:
    if line.startswith("book"):
        split_line = list(line.split(";"))  # Séparation des données afin de les importer
        book_title, book_year, summary, author_firstname, author_lastname = \
            split_line[1], split_line[2], split_line[3], split_line[4], split_line[5]
        # Appel de la méthode traitant et insérant les données dans la table "Books"
        books_stream(book_title, book_year, summary, author_firstname, author_lastname)