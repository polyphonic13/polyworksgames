set -e

USER="phds"
DREAMHOST_SERVER="dhaka.dreamhost.com"
SSH_PATH="home/phds"
POLYWORKS_DIR="polyworksgames.com"
TO_COPY=$1
DEST_DIR=$2

# ssh -o "StrictHostKeyChecking no" $USER@$DREAMHOST_SERVER << ENDHERE
# 	cd $POLYWORKS_DIR
# 	echo "CONTENTS OF POLWORKS DIR: "
# 	ls -l
# 	echo "TESTING FOR EXISTENCE OF $DEST_DIR"
# 	if [ ! -d "$DEST_DIR" ]; then
# 	  # Control will enter here if $DIRECTORY doesn't exist.
# 		echo "MAKING NEW DIR $DEST_DIR"
# 		mkdir $DEST_DIR
# 	else
# 		echo "$DEST_DIR EXISTS"
# 	fi	
# 	exit
# 	
# ENDHERE
echo "SCP'ING $TO_COPY TO $USER@$DREAMHOST_SERVER:/$SSH_PATH/$POLYWORKS_DIR/$DEST_DIR/"

if [[ -d $TO_COPY ]]; then
    echo "$TO_COPY is a directory"
	scp -r $TO_COPY $USER@$DREAMHOST_SERVER:/$SSH_PATH/$POLYWORKS_DIR/$DEST_DIR/
elif [[ -f $TO_COPY ]]; then
    echo "$TO_COPY is a file"
	scp $TO_COPY $USER@$DREAMHOST_SERVER:/$SSH_PATH/$POLYWORKS_DIR/$DEST_DIR/
else
    echo "$TO_COPY is not valid"
    exit 1
fi

echo "SCP COPY COMPLETE"
# tar cf - $1 | ssh $DREAMHOST_SERVER "tar xf - -C $DREAMHOST_PATH/"

# exit 0
