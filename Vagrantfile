<<-DOC

Vagrantfile

Vagrant is a tool that creates and configures virtual
development environments. It is a higher-level wrapper around
virtualization software such as VirtualBox and VMware, and around
configuration management software such as Ansible, Chef, and Puppet.

For more info about Vagrant visit:
https://www.vagrantup.com/

To download VirtualBox visit:
https://www.virtualbox.org/wiki/Downloads

DOC

# This is the name of this virtual machine (VM)
$environ = 'buildersrecords-web'

Vagrant.configure(2) do |config|
    # Download Ubuntu for this VM
    config.vm.box = 'ubuntu/trusty64'
    # Set the hostname of this VM
    config.vm.hostname = $environ
    # Use VirtualBox as the provider for this VM
    config.vm.provider :virtualbox do |v|
        v.name = $environ
    end
    # Run this shell script
    config.vm.provision :shell, inline: $shell
    # Open 5555 port of this VM to communicate with 5555 port of my local PC
    # Flask (application) port
    config.vm.network :forwarded_port, guest: 5555, host: 5555
end

# This is the shell script that configures this VM
$shell = <<-CONTENTS

sudo -s
export DEBIAN_FRONTEND=noninteractive

# Update apt
apt-get update
apt-get -y upgrade

# Install Python packages
apt-get -y install python3-pip
pip3 install --upgrade pip
pip3 install -r /vagrant/requirements.txt

# Install Heroku Toolbelt
wget -qO- https://toolbelt.heroku.com/install-ubuntu.sh | sh

# Install SASS
gem install sass

# Install Node
apt-get -y install nodejs
apt-get -y install npm

# Install package dependencies
npm install -g

CONTENTS
