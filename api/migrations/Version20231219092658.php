<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231219092658 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE activity ADD monitor_id INT DEFAULT NULL, CHANGE activity_type_id activity_type_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE activity ADD CONSTRAINT FK_AC74095A4CE1C902 FOREIGN KEY (monitor_id) REFERENCES monitor (id)');
        $this->addSql('CREATE INDEX IDX_AC74095A4CE1C902 ON activity (monitor_id)');
        $this->addSql('ALTER TABLE monitor DROP FOREIGN KEY FK_E115998581C06096');
        $this->addSql('DROP INDEX IDX_E115998581C06096 ON monitor');
        $this->addSql('ALTER TABLE monitor DROP activity_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE activity DROP FOREIGN KEY FK_AC74095A4CE1C902');
        $this->addSql('DROP INDEX IDX_AC74095A4CE1C902 ON activity');
        $this->addSql('ALTER TABLE activity DROP monitor_id, CHANGE activity_type_id activity_type_id INT NOT NULL');
        $this->addSql('ALTER TABLE monitor ADD activity_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE monitor ADD CONSTRAINT FK_E115998581C06096 FOREIGN KEY (activity_id) REFERENCES activity (id)');
        $this->addSql('CREATE INDEX IDX_E115998581C06096 ON monitor (activity_id)');
    }
}
